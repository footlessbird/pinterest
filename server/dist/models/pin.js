"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var pinSchema = new mongoose_1.Schema({
    // user 프로퍼티는 내가 만들었다는 택을 붙인 것임 따라서 내가 만든것을 나의 아이디를(몽고디비에 의해 자동 생성된 아이디) 조회해서 찾을 수 있게 됨
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    imgLink: String,
    imgDescription: String,
    savedBy: {
        type: mongoose_1.Schema.Types.Mixed,
        default: {},
    },
}, { timestamps: true });
var Pin = mongoose_1.model("Pin", pinSchema);
exports.default = Pin;
