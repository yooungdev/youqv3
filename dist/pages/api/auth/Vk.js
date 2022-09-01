"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Vk(options) {
    const apiVersion = '5.126';
    return {
        id: 'vk',
        name: 'vk',
        type: 'oauth',
        authorization: `https://oauth.vk.com/authorize?scope=email&v=${apiVersion}`,
        token: {
            url: `https://oauth.vk.com/access_token?v=${apiVersion}`,
            async request({ client, params, checks, provider }) {
                const { user_id, email, ...tokens } = await client.oauthCallback(provider.callbackUrl, params, checks, {
                    exchangeBody: {
                        client_id: options.clientId,
                        client_secret: options.clientSecret
                    }
                });
                return { tokens };
            }
        },
        userinfo: `https://api.vk.com/method/users.get?fields=photo_100&v=${apiVersion}`,
        profile(result) {
            var _a, _b, _c;
            const profile = (_b = (_a = result.response) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : {};
            return {
                id: profile.id,
                name: [profile.first_name, profile.last_name]
                    .filter(Boolean)
                    .join(' '),
                email: (_c = profile.email) !== null && _c !== void 0 ? _c : null,
                image: profile.photo_100,
            };
        },
        options,
    };
}
exports.default = Vk;
