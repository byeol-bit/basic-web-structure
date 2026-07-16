import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface PageEmptyCardProps {
  message: string;
}

function PageEmptyCard({
  message,
}: PageEmptyCardProps) {
  return (
    <Card className="mt-6 min-h-96 shadow-sm">
      <CardContent className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {message}
        </p>
      </CardContent>
    </Card>
  );
}

export default PageEmptyCard;