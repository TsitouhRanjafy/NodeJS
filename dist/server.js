"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importStar(require("express"));
const http_status_codes_1 = require("http-status-codes");
const node_http_1 = require("node:http");
const memcached_1 = __importDefault(require("memcached"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const PORT = process.env.PORT || 4000;
const Memcached = new memcached_1.default('127.0.0.1:11211', { retries: 5, remove: true });
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: true }));
app.get('/', (req, res) => {
    try {
        Memcached.get('otp', (err, data) => {
            if (!err) {
                res.status(http_status_codes_1.StatusCodes.OK).send(`
                    <h1 style="color:green;font-family: sans-serif;">OTP: ${data}</h1>
                    `);
                return;
            }
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send(`
                <h1 style="color:red;font-family: sans-serif;">${http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR}</h1>
            `);
        });
    }
    catch (error) {
        throw error;
    }
});
app.post('/', (req, res) => {
    const { otp } = req.query;
    if (!otp) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
            "status": http_status_codes_1.ReasonPhrases.BAD_REQUEST,
            "message": "query otp required"
        });
        return;
    }
    Memcached.set('otp', otp, 900, (err) => {
        if (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
                "status": http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR,
                "message": "erreur lors du caching"
            });
            return;
        }
    });
    res.status(http_status_codes_1.StatusCodes.OK).send({
        "status": http_status_codes_1.ReasonPhrases.OK,
        "message": "otp cached"
    });
});
server.listen(PORT, () => {
    console.log(` server running at http://localhost:${PORT}`);
});
