# frozen_string_literal: true

module Bootstrap
  module Text
    class ParagraphComponent < BaseComponent
      def initialize(id: 'paragraph', color: '', small: false, lead: false, options: {})
        @id = id
        @color = color
        @lead = lead
        @small = small
        @options = options
        add_classes
      end

      def add_classes
        super
        @classes += ' lead' if @lead
        @classes += ' small' if @small
      end
    end
  end
end
