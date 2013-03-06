# -*- coding: utf-8 -*- 

import webapp2
import json
import data

class JsonHandler(webapp2.RequestHandler):
  
  def jsonResponse(self, data):
    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps(data))


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

class PlaceHandler(JsonHandler):

  def get_repo(self):
      return data.PlacesRepository()

  def get(self):
    if not self.request.get('id'):
      repo = self.get_repo()
      data = repo.list()
      self.jsonResponse([ p for p in data ])
    else:
      self.jsonResponse(None)
      
  def post(self):
    data = json.loads(self.request.body)
    if None in data.values():
        raise
    p = Dto(**data)
    repo = self.get_repo()
    self.jsonResponse(repo.save(p))

  def delete(self):
    id = int(self.request.path.split('/')[-1])
    repo = self.get_repo()
    repo.delete(id)

routes = [
  ('/place.*', PlaceHandler)
]

app = webapp2.WSGIApplication(routes, debug=True)
