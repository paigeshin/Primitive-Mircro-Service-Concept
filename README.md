# Build primitive micro-service app

[App Blueprint](https://www.notion.so/App-Blueprint-fe94002e11e84050a5d1efe52cd59598)

[Data in MicroService ](https://www.notion.so/Data-in-MicroService-6029af70b2854296ac1562e41c26f33e)

[Communication Between Services](https://www.notion.so/Communication-Between-Services-1121c49a2873426fa2b5aa37e178afe3)

[Event Bus Overview](https://www.notion.so/Event-Bus-Overview-751be8ecdd4a46c4b18a71b42dcec79e)

[Event Bus Implementation ](https://www.notion.so/Event-Bus-Implementation-0e7f84e5a01c464f809d6e90870e1074)

# Four Core Services and One Event Bus

- Posts Service, handles posts
- Comments Service, handles comments
- Moderation Service, handle comments modification
- Query Service, holds all data

# Evet Bus

- It takes all events and send it back to subscribed services
