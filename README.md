# UCL Park API

API REST desenvolvida em Node.js para monitoramento de vagas de estacionamento em tempo real. O sistema recebe dados de sensores ultrassônicos via Arduino e disponibiliza o status das vagas para aplicações cliente.

## Como funciona

20 sensores ultrassônicos estão instalados nas vagas do estacionamento. Cada sensor detecta a presença de um veículo e envia o dado ao Arduino. O Arduino, conectado à internet, encaminha os dados para esta API via HTTP.

A API persiste cada leitura no banco de dados. O status atual de uma vaga é sempre determinado pelo **último registro** daquele sensor. A tabela também serve como **histórico completo** de ocupação.

```
[Sensor 1..20] → [Arduino] → [UCL Park API] → [MySQL]
                                    ↑
                          [App / Dashboard]
```

## Payload enviado pelo Arduino

```json
{
  "sensor": "1",
  "status": "ocupado",
  "data": "2024-10-01T14:30:00Z"
}
```

| Campo    | Tipo   | Descrição                              |
|----------|--------|----------------------------------------|
| `sensor` | string | Identificador do sensor (1 a 20)       |
| `status` | string | `"ocupado"` ou `"livre"`               |
| `data`   | string | Timestamp da leitura (ISO 8601)        |

## Requisitos

- [Docker](https://www.docker.com/) e Docker Compose

> Sem mais dependências. Node.js e MySQL sobem via container.

## Como subir

**1. Clone o repositório**
```bash
git clone <url-do-repositorio>
cd uclpark-api
```

**2. Configure as variáveis de ambiente**
```bash
cp .env.example .env
```
Edite o `.env` se necessário (as configurações padrão já funcionam com o Docker Compose).

**3. Suba os containers**
```bash
docker compose up --build
```

A API estará disponível em `http://localhost:3000`.

> Na primeira inicialização, o banco pode levar alguns segundos para ficar pronto. A API aguarda automaticamente via healthcheck antes de iniciar.

## Verificar se está rodando

```bash
curl http://localhost:3000/health
# {"status":"ok"}
```

## Stack

| Tecnologia   | Versão |
|--------------|--------|
| Node.js      | 24     |
| Express      | 4      |
| MySQL        | 8.4    |
