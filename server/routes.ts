import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getAuthenticatedUser, listUserRepos, createRepository } from "./github";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // GitHub routes
  app.get("/api/github/user", async (req, res) => {
    try {
      const user = await getAuthenticatedUser();
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/github/repos", async (req, res) => {
    try {
      const repos = await listUserRepos();
      res.json(repos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/github/push", async (req, res) => {
    try {
      const { repoName, description, isPrivate, isNewRepo } = req.body;
      
      if (!repoName) {
        return res.status(400).json({ error: "Repository name is required" });
      }

      const user = await getAuthenticatedUser();
      let repoUrl: string;

      if (isNewRepo) {
        const repo = await createRepository(repoName, description || "PM Brain Gym - Product Learning Hub", isPrivate);
        repoUrl = repo.html_url;
      } else {
        repoUrl = `https://github.com/${user.login}/${repoName}`;
      }

      // Configure git
      try {
        execSync('git config user.email "replit@example.com"', { stdio: 'pipe' });
        execSync('git config user.name "Replit Agent"', { stdio: 'pipe' });
      } catch (e) {
        // Config might already exist
      }

      // Initialize git if needed
      if (!fs.existsSync('.git')) {
        execSync('git init', { stdio: 'pipe' });
      }

      // Add all files and commit
      execSync('git add -A', { stdio: 'pipe' });
      
      try {
        execSync('git commit -m "Initial commit: PM Brain Gym - Product Learning Hub"', { stdio: 'pipe' });
      } catch (e) {
        // Might fail if nothing to commit
      }

      // Set up remote and push using the GitHub token
      const { getUncachableGitHubClient } = await import('./github');
      const octokit = await getUncachableGitHubClient();
      
      // Get the token for authenticated push
      const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
      const xReplitToken = process.env.REPL_IDENTITY 
        ? 'repl ' + process.env.REPL_IDENTITY 
        : process.env.WEB_REPL_RENEWAL 
        ? 'depl ' + process.env.WEB_REPL_RENEWAL 
        : null;

      const connectionSettings = await fetch(
        'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
        {
          headers: {
            'Accept': 'application/json',
            'X_REPLIT_TOKEN': xReplitToken || ''
          }
        }
      ).then(r => r.json()).then(data => data.items?.[0]);

      const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;

      if (!accessToken) {
        return res.status(500).json({ error: "Could not get GitHub access token" });
      }

      // Set up authenticated remote URL
      const authUrl = `https://${user.login}:${accessToken}@github.com/${user.login}/${repoName}.git`;
      
      try {
        execSync('git remote remove origin', { stdio: 'pipe' });
      } catch (e) {
        // Remote might not exist
      }
      
      execSync(`git remote add origin "${authUrl}"`, { stdio: 'pipe' });
      execSync('git branch -M main', { stdio: 'pipe' });
      execSync('git push -u origin main --force', { stdio: 'pipe' });

      res.json({ 
        success: true, 
        repoUrl,
        message: `Code pushed to ${repoUrl}`
      });
    } catch (error: any) {
      console.error("GitHub push error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
