from django.conf.urls import patterns, include, url

urlpatterns = patterns('api.views',

    url(r'^$', 'api_list', name="api_list"), 
    url(r'^test/$', 'api_test', name="api_test"), 

    url(r'^(?P<api_name>.*?)/$', 'api_generic', name="api_generic"),


    # api/timeline
    # api/cells

)