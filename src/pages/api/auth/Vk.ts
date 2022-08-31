import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

interface VkProfile {
    response: Array<{
        id: number;
        first_name: string;
        last_name: string;
        photo_100: string;
        can_access_closed: boolean;
        is_closed: boolean
    }>
}

export default function Vk<P extends Record<string, any> = VkProfile>(
    options: OAuthUserConfig<P>
): OAuthConfig<P> {
    const apiVersion = '5.126'

    return {
        id: 'vk',
        name: 'vk',
        type: 'oauth',
        authorization: `https://oauth.vk.com/authorize?scope=email&v=${apiVersion}`,
        token: {
            url: `https://oauth.vk.com/access_token?v=${apiVersion}`,
            async request({ client, params, checks, provider }) {
                const { user_id, email, ...tokens } = await client.oauthCallback(
                    provider.callbackUrl,
                    params,
                    checks,
                    {
                        exchangeBody: {
                            client_id: options.clientId,
                            client_secret: options.clientSecret
                        }
                    }
                )

                return { tokens }
            }
        },
        userinfo: `https://api.vk.com/method/users.get?fields=photo_100&v=${apiVersion}`,
        profile(result: P) {
            const profile = result.response?.[0] ?? {};

            return {
                id: profile.id,
                name: [profile.first_name, profile.last_name]
                    .filter(Boolean)
                    .join(' '),
                email: profile.email ?? null,
                image: profile.photo_100,
            };
        },
        options,
    }
}