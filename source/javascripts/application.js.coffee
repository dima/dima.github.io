#= require_tree ./vendor
#= require_tree ./lib

$ ->
  FastClick.attach(document.body)

  $('#back-to-top-button').click (e) ->
    $('html,body').scrollTo('0px' , 'slow')