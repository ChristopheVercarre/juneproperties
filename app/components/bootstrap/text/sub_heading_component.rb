# frozen_string_literal: true

module Bootstrap
  module Text
    class SubHeadingComponent < ApplicationComponent
      attr_reader :content

      validates :content, presence: true

      def initialize(id: 'sub-heading', tag: 'h2', options: {})
        @id = id
        @tag = tag
        @options = options
        add_classes
      end

      def add_classes
        super
        @classes += ' text-uppercase small text-sans-serif font-weight-bold'
      end
    end
  end
end
