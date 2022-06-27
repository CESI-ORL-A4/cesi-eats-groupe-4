db.createUser(
        {
            user: "test",
            pwd: "popo",
            roles: [
                {
                    role: "readWrite",
                    db: "command_db"
                }
            ]
        }
);