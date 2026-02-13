export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/api/", "/billing", "/case/"],
      },
    ],
  };
}
