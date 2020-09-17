# frozen_string_literal: true

module Bootstrap
  module Text
    class HeadingComponent < BaseComponent
      def initialize(id: 'heading', tag: 'h1', options: {})
        @id = id
        @tag = tag
        @options = options
        add_classes
      end
    end
  end
end
