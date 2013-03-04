# -*- coding: utf-8 -*- 

import webapp2
import json

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
    self.description = desc
    
  def data(self):
    return { 'id': self.id, 'name': self.name, 'coords': self.coords, 'icon': self.icon, 'desc': self.description }

places = [
  Place(1, 'Rzeźnia', [30, 45], 'icon-food', 'Tu zabijamy świnie.'),
  Place(2, 'Siedziba komornika', [60, 68], 'icon-suitcase', 'Tu mieszka świnia.'),
  Place(3, 'Burdel', [50, 30], 'icon-heart', 'A tu mieszkają urodziwe dziewczęta.')
]

class PlaceHandler(JsonHandler):

  def get(self, id = None):
    if not id:
      self.jsonResponse([ p.data() for p in places ])
    else:
      self.jsonResponse(None)
      
  def post(self):
    data = json.loads(self.request.body)
    newId = max([ p.id for p in places]) + 1
    p = Place(newId, data['name'], data['coords'], data['icon'], data['desc'])
    places.append(p)

routes = [
  ('/place.*', PlaceHandler)
]

app = webapp2.WSGIApplication(routes, debug=True)
