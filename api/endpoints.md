dazonia.xyz/api

POST	/files {file} ❌
GET		/files/ ✅
GET		/files/:id ✅
DELETE	/files/:id ✅
PATCH	/files/:id/title {title} ✅
GET		/files/search ❌
GET 	/files/:id/tags ❌

PUT		/files/:id/ratings {rating} ✅
GET		/files/:id/ratings ✅
DELETE	/files/:id/ratings ✅

POST	/invites ❌
DELETE	/invites/:id ❌

GET		/users ✅
GET		/users/:id ✅
GET		/users/@me ✅

POST 	/tags/:id/ ❌
GET		/tags/:id/ ❌
DELETE	/tags/:id/ ❌
GET		/tags/:id/files ❌
PUT     /tags/:id/files/:id ❌

➖➖➖➖➖➖➖➖➖➖

GET		/users/:id/profiles ❌
PATCH	/users/:id/profiles ❌
POST	/users/:id/profiles/avatar ❌

PUT		/favorites/:id ❌
DELETE	/favorites/:id ❌
