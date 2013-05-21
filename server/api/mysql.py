# -*- coding: utf-8 -*-

import datetime
import settings
import json
import MySQLdb as mdb
import sys

# mysql wrapper

class MySQL(object):
    """
    This class interacts with MySQL instance 
    """
    db = None
    
    def __init__(self, server=None, port=None):
        self.host = server or settings.SERVER_HOSTNAME
        self.port = int(port or settings.SERVER_PORT)
        self.connection = None

    def connect(self, user=None, pw=None, db=None):
        self.user = user or settings.SERVER_USER
        self.pw = pw or settings.SERVER_PASSWORD
        self.db = db or settings.SERVER_DB
        self.connection = mdb.connect(self.host, self.user, self.pw, self.db)    

    def query(self, query_string=None):
        
        result = []

        cur = self.connection.cursor(mdb.cursors.DictCursor)
        print self.connection
        cur.execute(query_string)

        rows = cur.fetchall()

        for row in rows:
            result.append(row)

        return result            
    