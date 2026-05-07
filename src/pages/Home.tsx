import { getDailyPrompt } from '../lib/promptUtils';
import { Hero } from '../components/home/Hero';
import { GenreShowcase } from '../components/home/GenreShowcase';
import { FeatureList } from '../components/home/FeatureList';

const dailyPrompt = getDailyPrompt();

export function Home() {
  return (
    <>
      <Hero dailyPrompt={dailyPrompt} />
      <GenreShowcase />
      <FeatureList />
    </>
  );
}
