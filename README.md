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
  "status": "ocupado"
}
```

| Campo    | Tipo   | Descrição                        |
|----------|--------|----------------------------------|
| `sensor` | string | Identificador do sensor (1 a 20) |
| `status` | string | `"ocupado"` ou `"livre"`         |

> A data/hora do registro é definida pelo servidor no momento do recebimento, impedindo inserções com timestamps arbitrários.

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

## Rotas

### `POST /api/vagas`
Registra uma leitura de sensor. Enviado pelo Arduino a cada mudança de estado.

**Body**
```json
{
  "sensor": "1",
  "status": "ocupado"
}
```

**Respostas**

| Status | Descrição |
|--------|-----------|
| `201` | Leitura registrada com sucesso |
| `400` | Campo ausente, status inválido ou vaga já está no status enviado |

```json
// 201
{ "id": 42 }

// 400 - mesmo status
{ "erro": "Vaga já está com status \"ocupado\"" }
```

---

### `GET /api/vagas/:sensor/status`
Retorna o status atual da vaga (último registro do sensor).

**Exemplo:** `GET /api/vagas/1/status`

**Respostas**

| Status | Descrição |
|--------|-----------|
| `200` | Status encontrado |
| `404` | Nenhum registro encontrado para o sensor |

```json
// 200
{
  "sensor_id": "1",
  "status": "ocupado",
  "data": "2024-10-01T14:30:00.000Z"
}
```

---

### `GET /api/vagas/:sensor/historico`
Retorna todos os registros do sensor ordenados do mais recente ao mais antigo.

**Exemplo:** `GET /api/vagas/1/historico`

**Resposta `200`**
```json
[
  { "id": 42, "sensor_id": "1", "status": "ocupado", "data": "2024-10-01T14:30:00.000Z" },
  { "id": 31, "sensor_id": "1", "status": "livre",   "data": "2024-10-01T13:10:00.000Z" }
]
```

---

## Stack

| Tecnologia   | Versão |
|--------------|--------|
| Node.js      | 24     |
| Express      | 4      |
| MySQL        | 8.4    |
