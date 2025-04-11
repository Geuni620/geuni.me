import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from "react-tweet";
import { getTweet as _getTweet } from "react-tweet/api";

import styles from "./tweet.module.css";

const getTweet = unstable_cache(
  async (id: string) => _getTweet(id),
  ["tweet"],
  { revalidate: 3600 * 24 }
);

const TweetContent = async ({ id }: { id: string }) => {
  try {
    const tweet = await getTweet(id);

    return tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />;
  } catch (error) {
    console.error(error);

    return <TweetNotFound error={error} />;
  }
};

export const Tweet = ({ id }: { id: string }) => (
  <div className={styles["tweet-container"]}>
    <Suspense fallback={<TweetSkeleton />}>
      <TweetContent id={id} />
    </Suspense>
  </div>
);
