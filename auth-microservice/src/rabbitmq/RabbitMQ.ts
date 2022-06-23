import amqp, { Channel, Connection } from "amqplib";

const rabbitmqHost = process.env.RABBITMQ_HOST || "localhost";
const rabbitmqUser = process.env.RABBITMQ_DEFAULT_USER || "guest";
const rabbitmqPass = process.env.RABBITMQ_DEFAULT_PASS || "guest";
const rabbitmqURL = `amqp://${rabbitmqUser}:${rabbitmqPass}@${rabbitmqHost}:5672`

export default class RabbitMQ {
    private static _instance: RabbitMQ | null = null;
    private _connection: Connection | null = null;
    private _channel: Channel | null = null;

    private constructor() {}

    async connect() {
        this._connection = await amqp.connect(rabbitmqURL);
        this._channel = await this._connection.createChannel();
        return this;
    }

    static async getInstance() { 
        if (!this._instance) {
            this._instance = await new RabbitMQ().connect();
        }
        return this._instance;
    }

    async send(queue: string, message: string) {
        if (!this._connection) {
            this.connect();
        }

        if (this._channel) {
            await this._channel.assertQueue(queue, { durable: true });
            const bufferMessage = Buffer.from(message, "utf-8");
            this._channel.sendToQueue(queue, bufferMessage);
            console.log("Message sent", message);
        }
    }
}
