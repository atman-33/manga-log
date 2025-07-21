const AdScripts = () => {
  return (
    <>
      {/* Googler Adsense */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3632222360837456"
        crossOrigin="anonymous"></script>
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-DQ7C1Q2LXZ"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-DQ7C1Q2LXZ');
        `}
      </script>

      {/* Adsterra Native Banner */}
      <script async data-cfasync="false" src="//pl27223405.profitableratecpm.com/3ea914530b8e17b9f994b545c863dce4/invoke.js"></script>
    </>
  );
};

export { AdScripts };
