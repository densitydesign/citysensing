# Create your views here.
from django.template import Context, RequestContext, loader
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, render_to_response
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required, user_passes_test


@login_required(login_url="/login/")
def client_index(request):
    c = RequestContext(request)
    return render_to_response("client/index.html", c)


def angular_views(request, page):
	c = RequestContext(request)
	return render_to_response("client/" + page, c)
