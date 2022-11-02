const express = require("express");
const jwt = require("jsonwebtoken");

//Models
const { getConnection, getQuery } = require("../../../../models");

const router = express.Router();

const verifyJWT = (req, res, next) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
        return res.status(403).json({
            wasSuccessful: false,
            description: "access_token não fornecida (；￣Д￣)",
        });
    }

    jwt.verify(access_token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({
                wasSuccessful: false,
                description: "Falha em autenticar access_token (＞﹏＜)",
            });
        }

        req.user_id = decoded.userId;
        next();
    });
};

router.get("/", verifyJWT, (req, res) => {
    getConnection(async (error, connection) => {
        if (!error && connection) {
            await getQuery(connection, {
                queryRequest: {
                    onwer: req.user_id,
                },
                queryTargetItems: "gift_code,gift_description",
                queryTargetItemsPrefix: "gift",
                queryTargetTable: "gifts",
                queryIsBinary: true,
                queryIsLimitless: true,
            })
                .then((result) => {
                    if (result.length === 0) {
                        res.status(401).json({
                            wasSuccessful: false,
                            description: "Nenhum presente encontrado (｡•́︿•̀｡)",
                        });
                    } else {
                        res.status(200).json({
                            wasSuccessful: true,
                            gift: {
                                giftCode: result[0].gift_code,
                                giftDescription: result[0].gift_description,
                            },
                        });
                    }
                })
                .catch(() => {
                    res.status(500).json({
                        wasSuccessful: false,
                        description:
                            "Erro, por favor tente novamente (ノ_<。)ヾ(´ ▽ ` )",
                    });
                });

            connection.release();
        } else {
            res.status(500).json({
                wasSuccessful: false,
                description:
                    "Erro, por favor tente novamente (ノ_<。)ヾ(´ ▽ ` )",
            });
        }
    });
});

module.exports = router;
