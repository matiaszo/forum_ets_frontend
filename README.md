> para abrir use ctrl + shift + v

### LoginResponse:
```
{
    id : number
    instructor: number
    token: string
}
```
# ✅ /auth:

- ## POST /auth ✅

  - ## Front-end:

    ### Body:
    ```
    {
        edv : string
        password : string
    }
    ```

  - ## Back-end:
    
    ### Json:
    ```
    {
        token : string
    }
    ```

# ✅ /register

- ## POST /register ✅

  ### Requirements:
  Bcrypt, 8 characters;

    > [!IMPORTANT] retornos do backend:  
    >
    > `0` - campos não completamente preenchidos pelo usuário, erro 400
    >
    > `1` - email inválido
    >
    > `2` - senha inválida
    >
    > `3` - edv não pode ser igual a um já cadastrado
    >
    > `10` - conta criada com sucesso

  - ## Front-end:

    ### Body:
    ```
    {
        edv : string
        password : string
        name : string
        email : string
        instructor : boolean
    }
    ```

  - ## Back-end:
    
    ### Text:
    ```
    number
    ```

# ✅ /section:

- ## GET /section ✅

  - ## Front-end:

    ### Query:
    ```
    page
    title
    ```

  - ## Back-end:
    
    ### Json:
    ```
    [
        {
            id : number
            title : string
            image : string
            description : string
        },
        ...
    ]
    ```

- ## GET /section/{idSection} ✅

  - ## Front-end:

    ### Path:
    ```
    idSection
    ```

  - ## Back-end:
    
    ### Json:
    ```
    {
        id : number
        title : string
        image : string
        description : string
        creator: string

        topics : [
            {
                id : number
                title : string
                mainComment : string
            },
            ...
        ]
    }
    ```

- ## POST /section ✅

  - ## Front-end:

    ### Body:
    ```
    {
        title : string
        image : string
        description: string
    }
    ```

  - ## Back-end:
    
    ### Json:
    ```
    {
        section: {
            id : number
            title : string
            image : string
            description: string
        },
        message: string
    }
    ```

# ✅ /topic

- ## GET /topic/{idTopic} ✅

  - ## Front-end:
    
    ### Path:
    ```
    idTopic
    ```

    ### Query:
    ```
    page
    ```

  - ## Back-end:
    
    ### Json:
    ```
    {
        id : number
        title : string
        idSection : number

        mainComment : {
            id : number
            content : string
            likes : number

            user : {
                id : string
                name : string
                instructor : boolean
                image : string
            }
        }

        comments : [
            {
                id : number
                content : string
                likes : number

                user : {
                    id : string
                    name : string
                    instructor : boolean
                    image : string
                }

                mention : {
                    id : number
                    username : string
                    content : string
                } | null
            },
            ...
        ]
    }
    ```

    > esta requisição retorna o título do tópico e alguns dos comentários  
    > os comentários enviados são afetados pela paginação
    > cada comentário tem seu conteúdo e dados do usuário para exibição
    > se um comentário fizer menção à outro, ele terá o usuário mencionado e seu comentário

- ## POST /topic ✅

  - ## Front-end:

    ### Body:
    ```
    {
        idSection : number
        title : string
        mainComment : string
    }
    ```

  - ## Back-end:

    ### Json:
    ```
    {
        message: number
    }
    ```

    > [!IMPORTANT] possíveis `retornos` e o que cada um significa:
    >
    > `1` - já existe um tópico com esse nome, erro 422
    >
    > `2` - campos não completamente preenchidos pelo usuário, erro 400
    >
    > `10` - tópico criado com sucesso

# ✅ /comment

- ## GET /comment/{idComment} ⁉️

  - ## Front-end:

    ### Path:
    ```
    idComment
    ```

  - ## Back-end:

    ### Json:
    ```
    {
        id : number
        content : string
        likes : number

        user : {
            id : string
            name : string
            instructor : boolean
            image : string
        }

        mention : {
            id : number
            username : string
            content : string
        } | null
    }
    ```

- ## POST /comment/{idTopic} ✅

  - ## Front-end:

    ### Body:
    ```
    {
        content : string
        idMention : number
    }
    ```

  - ## Back-end:

    ### Json:
    ```
    {
        id : number
        content : string

        user : {
            id : string
            name : string
            instructor : boolean
            image : string
        }

        mention : {
            id : number
            username : string
            content : string
        } | null
    }
    ```

- ## DELETE /comment/{idComment} ✅

  - ## Front-end:

    ### Path:
    ```
    idComment
    ```
    
    ### Attribute:
    ```
    token
    ```

  - ## Back-end:
    
    ### Text:
    ```
    mensagem de sucesso / erro

    1 - o usuário não é o dono do comentário
    10 - Deu certo
    ```

- ## POST /comment/like/{idComment}

  - ## Front-end:

    ### Path:
    ```
    idComment
    ```
    
    ### Body:
    ```
    {
      userId: number
    }
    ```

  - ## Back-end:
    
    ### Json:
    ```
    likes: number,

    ```

# ✅ /profile

- ## GET /profile/{idUser}

  - ## Front-end:

    ### Path:
    ```
    idUser
    ```

  - ## Back-end:
    
    ### Json:
    ```
    {
        edv : string
        password : string
        name : string
        email : string
        instructor : boolean
        github : string
        bio : string
        image : string

        skills: [
            {
                id : number
                image : string
                title : string
            },
            ...
        ]

        interests : [
            {
                id : number
                name : string
            }
        ]
    }
    ```

> **obs: para a criação do perfil, não é necassário uma bio ou um github, caso o usuário não tenha estes dados, eles voltarão como string vazia**

- ## GET /profile/feedback/{idUser} ✅

  - ## Front-end:

    ### Path:
    ```
    idUser
    ```

  - ## Back-end:
    
    ### Json:
    ```
    [
        {
            stars : number
            text : string
            visibility : boolean
            projectName : string
            user : {
                id : number
                image : string
                name : string
            }
        },
        ...
    ]
    ```

- ## GET /profile/interactions/{idUser} ✅

  - ## Front-end:

    ### Path:
    ```
    idUser
    ```

  - ## Back-end:
    
    ### Json:
    ```
    [
        {
            type : string
            timestamp : Date
            content : {
                text : string
                username : string
                title : string
            }
        },
        ...
    ]
    ```

    > `type` será um de três valores:
    >
    > `like` - `content` terá o usuário dono da publicação que foi curtida.
    >
    > `comment` - um post do fórum, `content` terá o título do tópico e o texto da publicação, e `username` será nulo
    >
    > `feedback` - `content` terá o texto do feedback e o usuário pra quem ele foi dado. **Não retornar feedbacks privados.**

- ## PATCH /profile/{idUser} ✅

  - ## Front-end:
  
    ### Path:
    ```
    idUser
    ```

    ### Body:
    ```
    {
        password : string | null
        name : string | null
        email : string | null
        github : string | null
        bio : string | null
        image : string | null
    }
    ```

  - ## Back-end:
    
    ### message:
    ```
    1 - email inválido
    2 - Senha inválida
    10 - Deu certo
    ```

- ## POST /profile/skill/{idUser} ✅

  - ## Front-end:
  
    ### Path:
    ```
    idUser
    ```

    ### Body:
    ```
    {
        id : number
    }
    ```

  - ## Back-end:
    
    ### Json:
    ```
    {
        id : number
        image : string
        title : string
    }
    ```

- ## DELETE /profile/skill/{idUser} ✅
  
  - ## Front-end:

    ### Path:
    ```
    idUser
    ```

    ### Body:
    ```
    {
        id : number
    }
    ```

  - ## Back-end:

    ### Text:
    ```
    mensagem de sucesso / erro

    1 - UserSkill não existe
    2 - Usuário bloqueado
    10 - Deu certo
    ```

- ## POST /profile/interest/{idUser} ✅

  - ## Front-end:

    ### Path:
    ```
    idUser
    ```

    ### Body:
    ```
    {
        name : string
    }
    ```

  - ## Back-end:
    
    ### Json:
    ```
    {
        id : number
        name : string
    }
    ```

- ## DELETE /profile/interest/{idUser} ✅
  
  - ## Front-end:

    ### Path:
    ```
    idUser
    ```

    ### Body:
    ```
    {
        id : number
    }
    ```

  - ## Back-end:

    ### Text:
    ```
    mensagem de sucesso / erro

    1 - Interesse não existe
    2 - Usuário bloqueado
    10 - Deu Certo
    ```

# ✅ /skill:

- ## POST /skill ✅

  - ## Front-end:

    ### Body:
    ```
    {
        id : number
        image : string
        title : string
    }
    ```

  - ## Back-end:
    
    ### Json:
    ```
    {
        id : number
        image : string
        title : string
    }
    ```

- ## GET /skill ✅
  
  - ## Front-end:


  - ## Back-end:
    
    ### Json:
    ```
    [
        {
            id : number
            image : string
            title : string
        },
        ...
    ]
    ```

- ## DELETE /skill/{idSkill} ✅
  
  - ## Front-end:

    ### Path:
    ```
    idSkill
    ```

  - ## Back-end:

    ### Text:
    ```
    mensagem de sucesso / erro
    ```

# /chat ✅ 

- ## GET /chat
  
  - ## Front-end:

    ### Query:
    ```
    page
    name
    ```

  - ## Back-end:

    ### Json:
    ```
    [
        {
            id : number
            name : string
        },
        ...
    ]
    ```

- ## GET /chat/{idChat} ✅ 

  - ## Front-end:
    
    ### Path:
    ```
    idChat
    ```

  - ## Back-end:

    ### Json:
    ```
    {
        id : number
        name : string

        messages : [
            {
                id : number
                text : string

                user : {
                    id : number
                    image : string
                    name : string
                    instructor : boolean
                }
            },
            ...
        ]
    }
    ```

- ## POST /chat ✅ 

  > Cria um novo chat

  - ## Front-end:
    
    ### Body:
    ```
    {
        name : string
    }
    ```

  - ## Back-end:
    
    ### Json:
    ```
    {
        id : number
        name : string
    }
    ```

- ## POST /chat/{idChat} ✅ 

  > Posta uma nova mensagem no chat
  - ## Front-end:
    
    ### Path:
    ```
    idChat
    ```

    ### Body:
    ```
    {
        text : string
    }
    ```

  - ## Back-end:
    
    ### Text:
    ```
    mensagem de sucesso / erro
    ```

# /project ✅

- ## GET /project ✅
  
  > Retornar os projetos que o usuário faz parte, baseado no JWT

  - ## Front-end:
    ```
    ```
  
  - ## Back-end:

    ### Json:
    ```
    [
        {
            id : number
            name : string
            description : string
            image : string
        },
    ]
    ```

- ## GET /project/{idProject} ✅

  - ## Front-end:
    
    ### Path:
    ```
    idProject
    ```

  - ## Back-end:

    ### Json:
    ```
    {
        id : number
        name : string
        description : string
        goals : string[]

        users : [
          {
              id : number
              image : string
              name : string
              instructor : boolean
          },
          ...
        ]

        messages : [
            {
                id : number
                text : string

                id_user : number
            },
            ...
        ]
    }
    ```

- ## POST /project ✅

  > Cria um novo projeto

  - ## Front-end:
    
    ### Body:
    ```
    {
        name : string
        goals : string[]
        description : string

        users : number[]
    }
    ```

    > O campo `users` se refere aos id's dos usuários adicionados ao projeto.

  - ## Back-end:
    
    ### Json:
    ```
    {
        id : number
        name : string
    }
    ```

- ## POST /project/{idProject} ✅

  > Posta uma nova mensagem no chat do projeto
  - ## Front-end:
    
    ### Path:
    ```
    idProject
    ```

    ### Body:
    ```
    {
        text : string
    }
    ```

  - ## Back-end:
    
    ### Text:
    ```
    mensagem de sucesso / erro
    ```

# /feedback

- ## POST /feedback

  - ## Front-end:

    ### Body:
    ```
    {
        idSender : number
        idReceptor : number
        idProject : number
        visibility : boolean
        text : string
        stars : number
    }
    ```
  
  - ## Back-end:

    ### Text:
    ```
    mensagem de sucesso / erro
    ```

# /user

> Busca dados do usuário de forma mais simplificada que /profile

- ## GET /user

  - ## Front-end:

    ### Query:
    ```
    name
    ```

  - ## Back-end:
    
    ### Json:
    ```
    [
        {
            id : number
            name : string
            image : string
        },
        ...
    ]
    ```
