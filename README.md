This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



## Getting Started

1. Introduction:
    * "I developed an automation platform designed to enable users to create custom workflows where actions are triggered by specific events."
2. Architecture Overview:
    * "The system is built with a React frontend that communicates with a Node.js backend. The core functionality revolves around 'zaps,' which are triggers followed by multiple actions."
3. Webhook Functionality:
    * "When users log in or sign up, they can create a zap. For instance, when a webhook is triggered by an external client, a URL is generated for our webhook server. This server captures the event and processes it."
4. Database and Event Processing:
    * "Captured events are stored in a PostgreSQL database, managed with Prisma. Simultaneously, metadata from these events is pushed to a Kafka queue, which helps in distributing the load and improves our event-handling speed by approximately 75%."
5. Worker Server:
    * "To execute the tasks, I implemented a worker server that pulls tasks from the Kafka queues, leading to a 60% reduction in task execution time, thereby enhancing the system's efficiency."
6. Current Capabilities:
    * "Currently, the platform automates email notifications and money transfers using Solana wallets, ensuring seamless transactions whenever a specific event occurs."
7. Conclusion:
    * "In summary, I was responsible for designing and developing the entire system—from the frontend and backend to the event-handling infrastructure—resulting in a highly efficient platform for automating complex tasks."

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
![image](https://github.com/user-attachments/assets/2f87d5a8-57f4-4e0d-a488-63976141979c)
![image](https://github.com/user-attachments/assets/7e1d73fa-88bf-4f2e-b520-48b6c9475427)
![image](https://github.com/user-attachments/assets/9e8c1574-7362-49af-8e38-ec1f906b122c)

<img width="785" alt="Screenshot 2024-10-30 at 10 03 34 PM" src="https://github.com/user-attachments/assets/556b2c23-87a1-4ab5-b2c0-c6f8d689e281">

<img width="1465" alt="Screenshot 2024-10-30 at 11 30 11 PM" src="https://github.com/user-attachments/assets/46148a0c-9b5b-4263-a4dc-596106f94d27">


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

