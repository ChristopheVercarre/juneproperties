# frozen_string_literal: true

module Bootstrap
  module Text
    class LinkComponent < BaseComponent
      def initialize(id: 'link', to: '#', data: {}, styled_like: 'link', options: {})
        @id = id
        @tag = options[:tag] || 'a'
        @to = to
        @data = data
        @styled_like = styled_like
        @options = options
        super
      end

      def add_classes
        super
        if @styled_like == 'label'
          @classes += ' text-uppercase small text-decoration-none font-weight-bold'
        elsif @styled_like[0..2] == 'btn'
          @classes += " #{@styled_like}"
        end
      end
    end
  end
end
