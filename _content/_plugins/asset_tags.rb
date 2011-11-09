class IncludeJsTag < Liquid::Tag  
  def initialize(tag_name, text, tokens)
    super
    @text = text
  end
  
  def render(context)
    "<script src=#{@text} type='text/javascript'></script>"
  end 
end

Liquid::Template.register_tag('include_js', IncludeJsTag)

class IncludeCssTag < Liquid::Tag
  def initialize(tag_name, text, tokens)
    super
    @text = text
  end
  
  def render(context)
    "<link href=#{@text} media='screen' rel='stylesheet' type='text/css' />"
  end
end

Liquid::Template.register_tag('include_css', IncludeCssTag)