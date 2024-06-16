from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path('user/', include('users.urls')),
    path('api/', include('api.urls')),

]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ]