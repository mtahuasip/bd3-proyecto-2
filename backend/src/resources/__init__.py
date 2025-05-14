from .movie_resource import ns as movies
from .category_resource import ns as category
from .comment_resource import ns as comment
from .favorite_resource import ns as favorite
from .playlist_resource import ns as playlist
from .reaction_resource import ns as reaction
from .user_resource import ns as user
from .auth_resource import ns as auth

namespaces = [
    movies,
    category,
    comment,
    favorite,
    playlist,
    reaction,
    user,
    auth,
]
