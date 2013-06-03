# Create your views here.
import bson, json
from decorators import *

import settings
import requests

# default db
#ms = MySQL()
#ms.connect()

#cursor.close()
#conn.close()


@api_response
def api_generic(request, api_name):

    url = settings.BASE_URL + "/" + api_name
    data = request.POST.dict()
    headers = {'content-type':'application/json', 'accept':'text/plain'}
    r = requests.post(url, data=json.dumps(data), headers=headers)
    
    response = json.loads(r.text)

    return response


@api_response
def api_list(request):
    """
    The list of available apis
    """
    response = {}

    response['apis'] = 'list'
    return response


@api_response
def api_test(request):
    """
    A simple api test
    """
    response = {}

    # let's put some information about the connection
    response['version']  = ms.query("SELECT VERSION()")
    response['current_user']  = ms.query("SELECT CURRENT_USER()")
    response['data']  = ms.query("SELECT * FROM django_site")
    
    return response


