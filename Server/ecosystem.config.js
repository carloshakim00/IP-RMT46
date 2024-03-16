module.exports = {
	    apps: [
		            {
				                name: "MedShop",
				                script: "./bin/www",
				                env:{
							                NODE_ENV: "production",
							                PORT:80,
							                JWT_SECRET:"rahasia",
							                cloud_name:"dpmwni4tm",
							                api_key:134972379139894,
							                api_secret:"xjCSBxEh5RFiwnZ0UQGLfL4W-as",
							                DATABASE_URL:"postgres://postgres.hhkhifaorqrbqjtoxnoo:5E63VM6HiORS1VCy@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres",
							            },
				            },
		        ],
};
