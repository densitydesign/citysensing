from django.conf.urls import patterns, include, url

urlpatterns = patterns('client.views',

    url(r'^$', 'client_index', name="client_index"), 
    url(r'^views/(?P<page>[-\w]+.html)/$', 'angular_views'),


)