import { manuscripts } from "@/config/manuscripts";
import { ExpandableManuscriptCard } from "./ExpandableManuscriptCard";

export function ManuscriptsSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">Source Manuscripts</h2>
        <span className="text-sm text-muted-foreground">
          {manuscripts.length} texts available
        </span>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {manuscripts.map((manuscript) => (
          <ExpandableManuscriptCard 
            key={manuscript.id} 
            manuscript={manuscript} 
          />
        ))}
      </div>
    </div>
  );
}
