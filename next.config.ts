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
          {
              source: "/topic",
              destination: "/topic",
          },
          {
            source: "/session",
            destination: "/session",
        },
        {
            source : '/projectSelected',
            destination: '/projectSelected'
        },
        // {
        //     source: '/api/:path*',  // Defina o prefixo para as requisições
        //     destination: 'http://localhost:8080/:path*', // Redireciona para o backend
        //   },
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
