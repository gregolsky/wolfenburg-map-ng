# -*- coding: utf-8 -*- 

import webapp2
import json as serializer
import data

from functools import wraps

class JsonHandler(webapp2.RequestHandler):
  
  def jsonResponse(self, data):
    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps(data))

def json(f):
    
  @wraps(f)
  def wrapper(*args, **kwargs):
    response = args[0].response
    response.headers['Content-Type'] = 'application/json'
    data = f(*args, **kwargs)
    serialized = serializer.dumps(data)
    response.out.write(serialized)

  return wrapper;
    
    
class Place:
  def __init__(self, id, name, coords, icon, desc):
    self.id = id
    self.name = name
    self.coords = coords
    self.icon = icon
    self.desc = desc
    
class Dto:
    def __init__(self, **kwargs):
        self.__dict__ = kwargs
    
def place_data(p):
  return p.__dict__

class PlaceHandler(webapp2.RequestHandler):

  def get_repo(self):
      return data.PlaceRepository()

  @json
  def get(self):
    mapId = self.request.get('mapId') 
    return self.get_repo().list(mapId)
      
  @json    
  def post(self):
    data = serializer.loads(self.request.body)
    if None in data.values():
      raise
    p = Dto(**data)
    return self.get_repo().save(p)
    
  def delete(self):
    id = int(self.request.path.split('/')[-1])
    self.get_repo().delete(id)

class MapHandler(webapp2.RequestHandler):
    
    def get_repo(self):
      return data.MapRepository()
    
    @json
    def get(self):
      repo = self.get_repo()  
      try:
        id = int(self.request.url.split('/')[-1])
      except ValueError:
        return repo.list()
    
      return repo.get(id)
  
    @json  
    def post(self):
      data = serializer.loads(self.request.body)
      if None in data.values():
        raise
      p = Dto(**data)
      return self.get_repo().save(p)    
    
routes = [
  ('/map/[0-9]*/place.*', PlaceHandler),
  ('/map.*', MapHandler)
]

app = webapp2.WSGIApplication(routes, debug=True)
