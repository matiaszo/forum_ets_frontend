const nextConfig = {

  rewrites: () =>{

      return[
          {
              source: "/",
              destination: "/login",
          },
          {
              source: "/register",
              destination: "/register",
          },
          {
              source: "/home",
              destination: "/home",
          },
          {
              source: "/forum",
              destination: "/forum",
          },
          {
              source: "/chat",
              destination: "/chat",
          },
          {
              source: "/project",
              destination: "/project",
          },
          {
              source: "/profile",
              destination: "/profile",
          },
          {
              source: "/topic",
              destination: "/topic",
          },
      ]
  }
};

export default nextConfig;
