from django.conf.urls import patterns, include, url
import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'citysensing.views.home', name='home'),
    # url(r'^citysensing/', include('citysensing.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    
    # Login
    url (r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'client/login.html'}, name="login"),
    url (r'^logout/$', 'django.contrib.auth.views.logout', {'next_page' : '/'}, name="logout"),

    # Client
    url(r'^', include('client.urls')),
    
    # API
    url(r'^api/', include('api.urls')),



)

if settings.DEBUG:
    urlpatterns = patterns('',
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
    url(r'', include('django.contrib.staticfiles.urls')),
) + urlpatterns

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
urlpatterns += staticfiles_urlpatterns()