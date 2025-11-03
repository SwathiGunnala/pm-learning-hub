import { ArticleForm } from "../article-form";

export default function ArticleFormExample() {
  return (
    <div className="p-6 max-w-3xl">
      <ArticleForm 
        onGenerate={(data) => console.log("Generate article:", data)} 
        isGenerating={false} 
      />
    </div>
  );
}
