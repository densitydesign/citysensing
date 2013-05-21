from django.conf.urls import patterns, include, url

urlpatterns = patterns('api.views',

    url(r'^$', 'api_list', name="api_list"), 
    url(r'^test/$', 'api_test', name="api_test"),    

)