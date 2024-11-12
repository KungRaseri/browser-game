module default {
    type Account {
        required email: str;
        required password_hash: str;
        required user_auth_token: str;
        required user_role: AccountRole;
    }

    type Biome {
        required name: str;
    }

    scalar type AccountRole extending<MEMBER, SUPPORT, ADMINISTRATOR>
    scalar type ServerStatus extending<OFFLINE, MAINTENANCE, ONLINE>
    scalar type TileType extending<OCEAN, LAND>
}
