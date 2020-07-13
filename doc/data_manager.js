// DATA MANAGER CONFIG


{
	"site_name": "Warehouse 102",
	"site_id": 501,
	"upload_servers": [
		{
			"name": "XyeNET",
			"upload_enabled": true,
			"upload_interval": 5,
			"upload_log_interval_count": 6,
			"local_log_enabled": true,
			"local_log_interval": 60,
			"host": "xyenet22.automationghana.com",
			"port": 3015,
			"protocol": "tcp",
			"upload_format": "FM:{{SITE_ID}},{{flow_rate}},{{totalizer}},{{alarm}},time={{TIMESTAMP}},log={{LOG_FLAG}}",
			"msg_config": {
				"sms_enabled": true,
				"email_enabled": true,
				"recipients": [
					{
						"name": "Kofi Menu",
						"number": "+233202026701",
						"email": "kofi.menu@gmail.com"
					},
					{
						"name": "Adwoa Mansah",
						"number": "+233202026701",
						"email": "adwoa.mansah@gmail.com"
					},
					{
						"name": "Isaac Mintah",
						"number": "+233202026701",
						"email": "isaac.mintah@gmail.com"
					}
				]
			}
		},
    {
        "name": "MQTT",
        "upload_enabled": true,
        "upload_interval": 5,
        "upload_log_interval_count": 6,
        "local_log_enabled": true,
        "local_log_interval": 60,
        "host": "127.0.0.1",
        "port": 1883,
        "protocol": "mqtt",
        "topic": "xyenet",
        "qos": 0,
        "retain": false,
        "options": {"username": "username", "password": "password"},
        "upload_format": {
            "FM": "{{SITE_ID}}",
            "data": "{{flow_rate}}"
        },
        "msg_config": {
            "sms_enabled": true,
            "email_enabled": true,
            "recipients": [
                {
                    "name": "Kofi Menu",
                    "number": "+233202026701",
                    "email": "kofi.menu@gmail.com"
                },
                {
                    "name": "Adwoa Mansah",
                    "number": "+233202026701",
                    "email": "adwoa.mansah@gmail.com"
                },
                {
                    "name": "Isaac Mintah",
                    "number": "+233202026701",
                    "email": "isaac.mintah@gmail.com"
                }
            ]
        }
    }
	],
	"tags":{
		"update_interval": 500,
		"DI": [
			{
				"name": "DI0",
				"address": "I:0@XPRO1"
			},
			{
				"name": "DI1",
				"address": "I:1@XPRO1"
			},
			{
				"name": "DI2",
				"address": "I:2@XPRO1"
			},
			{
				"name": "DI3",
				"address": "I:3@XPRO1"
			},
			{
				"name": "DO0",
				"address": "O:0@XPRO1"
			},
			{
				"name": "DO1",
				"address": "O:1@XPRO1"
			},
			{
				"name": "DO2",
				"address": "O:2@XPRO1"
			},
			{
				"name": "DO3",
				"address": "O:3@XPRO1"
			}
		],
		"AI": [
			{
				"name": "AI0",
				"address": "Rn:0@XPRO1",
				"scaling": null,
				"dp": 2
			},
			{
				"name": "AI1",
				"address": "Rn:1@XPRO1",
				"scaling": null,
				"dp": 2
			},
			{
				"name": "AO0",
				"address": "Hn:0@XPRO1",
				"scaling": null,
				"dp": 2
			},
			{
				"name": "AO1",
				"address": "Hn:1@XPRO1",
				"scaling": null,
				"dp": 2
			}
		],
		"outputs": [
			{
				"name": "DO0",
				"address": "O:0@XPRO1"
			},
			{
				"name": "DO1",
				"address": "O:1@XPRO1"
			},
			{
				"name": "DO2",
				"address": "O:2@XPRO1"
			},
			{
				"name": "DO3",
				"address": "O:3@XPRO1"
			}
		]
	}




}
