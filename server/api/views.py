# Create your views here.
import bson, json
from mysql import *
from django.template import Context, loader
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.conf import settings as django_settings

from decorators import *


# default db
ms = MySQL()
ms.connect()

#cursor.close()
#conn.close()

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


