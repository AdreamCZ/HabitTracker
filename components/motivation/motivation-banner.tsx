import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandomQuote } from "@/app/modules/motivation/actions";

export const dynamic = "force-dynamic";

const MotivationBanner = async () => {
  const randomQuote = await getRandomQuote();

  return (
    <Card className="bg-green-50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold italic text-foreground text-center">
          &quot;{randomQuote.text}&quot;
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

const MotivationBannerSkeleton = () => {
  return (
    <Card className="bg-green-50">
      <CardHeader>
        <div className="flex justify-center">
          <Skeleton className="h-7 w-3/4 rounded-md bg-green-200/50" />
        </div>
      </CardHeader>
    </Card>
  );
};

export { MotivationBanner, MotivationBannerSkeleton };
