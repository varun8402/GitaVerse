import { FeatureProps } from "../utils";

export const Feature = ({title, body}: FeatureProps) => {
  return (
    <div className="rounded-xl border border-gray-400 bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
