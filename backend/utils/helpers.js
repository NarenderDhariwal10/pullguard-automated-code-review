const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!upstashUrl || !upstashToken) {
  throw new Error(
    'Missing Upstash Redis credentials. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.'
  );
}

const parsedUrl = new URL(upstashUrl);
const protocol = parsedUrl.protocol === 'https:' ? 'rediss:' : 'redis:';

exports.redisOptions = {
  url: `${protocol}//:${upstashToken}@${parsedUrl.host}`,
};
