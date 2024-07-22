export const useAnalytics = () => {
  const createGoogleAnalyticsScripts = () => {
    const script1 = document.createElement("script");
    const script2 = document.createElement("script");

    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-MPYPZ0MSLM";

    script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-MPYPZ0MSLM');
  `;

    return [script1, script2];
  };

  const createCloudflareAnalyticsScript = () => {
    const script = document.createElement("script");

    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.setAttribute(
      "data-cf-beacon",
      '{"token": "85d6ed7a2cbe45eca284dc0ddaaca257"}'
    );

    return script;
  };

  const addAnalyticsScripts = () => {
    const scripts = [
      ...createGoogleAnalyticsScripts(),
      createCloudflareAnalyticsScript(),
    ];

    scripts.forEach((script) => {
      document.head.appendChild(script);
    });
  };

  return {
    addAnalyticsScripts,
  };
};
