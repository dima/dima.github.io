#= require_tree ./vendor
#= require_tree ./lib

$ ->
  FastClick.attach(document.body)

  if !!window.location.hash
    $('#modal').addClass('visible')
  else
    $('modal').removeClass('visible')

  $('.timeline').find('img').unveil(10)

  $('.open-modal').click (e) ->
    item = $(this).attr('href').replace /#/g, ''
    $('#modal').addClass('visible')
    $('#fotorama').data('fotorama').show(item)

  $('.close').click (e) ->
    $('#modal').removeClass('visible')
    item = $('.timeline').find("a[href=#{window.location.hash}]")
    window.location.hash = ''
    $('html,body').scrollTo(item)

  $('#back-to-top-button').click (e) ->
    $('html,body').scrollTo('0px' , 'slow')