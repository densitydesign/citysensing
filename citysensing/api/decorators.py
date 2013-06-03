# custom decorators
from time import time
from django.http import HttpResponse
from django.utils.functional import wraps
import json
#import bson


def api_response(view):
    
    @wraps(view)
    def inner_decorator(request, *args, **kwargs):
    
        start_time = time()
        
        try:
            status_code = 200
            response = {}
            response['result'] = view(request, *args, **kwargs)

            
        except Exception, e:
            import traceback            
            traceback.print_exc()
            status_code = 500
            response = {} #createResponse401(str(e)) 
            response['error'] = '%s: %s' % (e.__class__.__name__, str(e))
        
        total = time() - start_time
        response['completed_in'] = '%fs' % total

        body = json.dumps(response)
        
        return HttpResponse(body, status=status_code, mimetype="application/json")
        
    return inner_decorator