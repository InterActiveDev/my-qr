export default defineEventHandler((event) => {
  const ip = event.node.req.headers['x-forwarded-for'] || event.node.req.connection.remoteAddress;
  return { ip };
});