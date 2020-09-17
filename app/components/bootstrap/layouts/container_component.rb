# frozen_string_literal: true

module Bootstrap
  module Layouts
    class ContainerComponent < ApplicationComponent
      attr_reader :content

      validates :content, presence: true

      def initialize(id: 'container', options: {})
        @id = id
        @content = content
        @options = options
        super
      end
    end
  end
end
