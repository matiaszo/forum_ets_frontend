import { hostname } from "os";

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
      ]
      
  },
  images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '**', // Permite qualquer domínio com protocolo HTTP
        },
        {
          protocol: 'https',
          hostname: '**', // Permite qualquer domínio com protocolo HTTPS
        },
      ],
    },
  
};

export default nextConfig;
